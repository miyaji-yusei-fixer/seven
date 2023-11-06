import Card from '@/components/Card.vue';
import marks from '@/utils/mark/markUtil'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Example/Card',
    component: Card,
    tags: ['autodocs'],
    render: (args, { argTypes }) => ({
        props: Object.keys(argTypes),
        components: { Card },
        template: '<card v-bind="$props" />',
    }),
    argTypes: {
        mark: {
            control: { type: 'select' },
            options: marks
        },
        width: {
            control: { type: 'number', min: 50, max: 200, step: 10 },
        },
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
    args: {
        mark: "s1",
        width: 100
    },
};
