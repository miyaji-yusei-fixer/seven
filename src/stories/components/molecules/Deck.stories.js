import Deck from '@/components/molecules/Deck.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Components/Molecules/Deck',
    component: Deck,
    tags: ['autodocs'],
    render: (args, { argTypes }) => ({
        props: Object.keys(argTypes),
        components: { Deck },
        template: '<deck v-bind="$props" />',
    }),
    argTypes: {
        deckSheets: 30,
        discard: "s1"
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
    args: {
        deckSheets: 30,
        discard: "s1"
    },
};

export const IsDisabled = {
    args: {
        deckSheets: 30,
        discard: "s1",
        isDisabled: true
    },
};
