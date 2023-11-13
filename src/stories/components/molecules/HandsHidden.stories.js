import HandsHidden from '@/components/molecules/HandsHidden.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Components/Molecules/HandsHidden',
    component: HandsHidden,
    tags: ['autodocs'],
    render: (args, { argTypes }) => ({
        props: Object.keys(argTypes),
        components: { HandsHidden },
        template: '<HandsHidden v-bind="$props" />',
    }),
    argTypes: {
        hands: 5
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
    args: {
        hands: 5
    },
};
