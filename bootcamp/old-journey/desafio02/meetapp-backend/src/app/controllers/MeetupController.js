import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns';
import * as Yup from 'yup';
import Sequelize, { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import Subscription from '../models/Subscription';

class MeetupController {
  async index(req, res) {
    const page = req.query.page || 1;
    const where = {};

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const subscriptions = await Subscription.findAll({
      attributes: ['meetup_id'],
      where: {
        user_id: req.userId,
      },
    }).map(su => su.meetup_id);

    where.id = {
      [Op.notIn]: subscriptions,
    };

    const meetups = await Meetup.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'name'] },
        { model: File, as: 'file', attributes: ['id', 'url', 'path'] },
      ],
      where,
      limit: 2,
      offset: 2 * page - 2,
      order: [['date', 'ASC']],
    });

    return res.json(meetups);
  }

  async show(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      include: [
        { model: User, as: 'user', attributes: ['id', 'name'] },
        { model: File, as: 'file', attributes: ['id', 'path', 'url'] },
      ],
    });

    return res.json(meetup);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check date is before now
     */
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(400)
        .json({ error: 'Date cannot be later than today.' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.create({ ...req.body, user_id });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check if user is meetup organizer
     */
    const user_id = req.userId;
    const meetup = await Meetup.findByPk(req.params.id);
    if (meetup.user_id !== user_id) {
      return res
        .status(401)
        .json({ error: 'You are not the organizer of this meetup.' });
    }

    /**
     * Check date is before now
     */
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(400)
        .json({ error: 'Date cannot be later than today.' });
    }

    /**
     * Check Meetup past
     */
    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetups." });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);
    const user_id = req.userId;

    if (meetup.user_id !== user_id) {
      res
        .status(401)
        .json({ error: "you can't cancel a meetup from another organizer." });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups." });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
