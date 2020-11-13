import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user, subscription, subscriptionCount } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `[${meetup.title}] Nova inscrição`,
      template: 'subscription',
      context: {
        organizer: meetup.User.name,
        meetup: meetup.title,
        user: user.name,
        email: user.email,
        date: format(
          parseISO(subscription.createdAt),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        subscriptionNumber: subscription.id,
        subscriptionCount,
      },
    });
  }
}

export default new SubscriptionMail();
