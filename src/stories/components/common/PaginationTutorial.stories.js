import PaginationTutorial from '@/components/common/PaginationTutorial.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Components/Common/PaginationTutorial',
    component: PaginationTutorial,
    tags: ['autodocs'],
    render: (args, { argTypes }) => ({
        props: Object.keys(argTypes),
        components: { PaginationTutorial },
        template: '<PaginationTutorial v-bind="$props" />',
    }),
    argTypes: {
        pageLength: 4
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
    args: {
        pageLength: 4
    },
};
