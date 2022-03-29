import React from 'react';
import { Meta, Story } from '@storybook/react';
import EventDetail, { IProps as IEventDetailsProps } from './index';

const Template: Story<IEventDetailsProps> = (args) => <EventDetail {...args} />;

export const Primary = Template.bind({});

Primary.args = {};

export default {
  title: 'Ticketing/EventDetail',
  component: EventDetail,
} as Meta;
