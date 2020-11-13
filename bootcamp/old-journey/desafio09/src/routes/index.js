import React from 'react';
import { Switch } from 'react-router-dom';

import Route from '~/routes/Route';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Meetup from '~/pages/Meetup';
import Detail from '~/pages/Meetup/Detail';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetups/:id/details" component={Detail} isPrivate />
      <Route path="/meetups/new" component={Meetup} isPrivate />
      <Route path="/meetups/:id" component={Meetup} isPrivate />
    </Switch>
  );
}
