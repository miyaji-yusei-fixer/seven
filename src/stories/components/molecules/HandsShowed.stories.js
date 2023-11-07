import HandsShowed from '@/components/molecules/HandsShowed.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Components/Molecules/HandsShowed',
    component: HandsShowed,
    tags: ['autodocs'],
    render: (args, { argTypes }) => ({
        props: Object.keys(argTypes),
        components: { HandsShowed },
        template: '<hands-showed v-bind="$props" />',
    }),
    argTypes: {
        hands: ["s1", "hk", "c7", "dj", "j1"],
        // selected: [2, 3]
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
    args: {
        hands: ["s1", "hk", "c7", "dj", "j1"],
        // selected: [2, 3]
    },
};
