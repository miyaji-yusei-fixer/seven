import CardBack from '@/components/common/CardBack.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Components/Common/CardBack',
  component: CardBack,
  tags: ['autodocs'],
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { CardBack },
    template: '<CardBack v-bind="$props" />',
  }),
  argTypes: {
    width: {
      control: { type: 'number', min: 50, max: 200, step: 10 },
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
  args: {
    width: 100
  },
};
