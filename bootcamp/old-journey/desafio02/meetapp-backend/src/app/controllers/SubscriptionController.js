import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import Subscription from '../models/Subscription';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const user_id = req.userId;

    const subscriptions = await Subscription.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: Meetup,
          include: [
            {
              model: File,
              as: 'file',
            },
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name'],
            },
          ],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user_id = req.userId;
    const meetup_id = req.params.meetupId;

    const user = await User.findByPk(user_id);
    const meetup = await Meetup.findByPk(meetup_id, {
      include: [{ model: User, as: 'user' }],
    });

    if (meetup.user_id === user_id) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups" });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't subscribe to past meetups" });
    }

    const subscriptionExist = await Subscription.findOne({
      where: {
        meetup_id,
        user_id,
      },
    });

    if (subscriptionExist) {
      return res
        .status(401)
        .json({ error: 'You are already subscribed to this meetup' });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const subscription = await Subscription.create({
      meetup_id,
      user_id,
    });

    const subscriptionCount = await Subscription.count({
      where: {
        meetup_id,
      },
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
      subscription,
      subscriptionCount,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const meetup_id = req.params.meetupId;
    const user_id = req.userId;

    const subscription = await Subscription.findOne({
      where: {
        meetup_id,
        user_id,
      },
    });

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
