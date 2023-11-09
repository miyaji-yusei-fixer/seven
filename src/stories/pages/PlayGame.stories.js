import PlayGame from '@/components/organisms/PlayGame.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Pages/PlayGame',
    component: PlayGame,
    tags: ['autodocs'],
    render: () => ({
        components: { PlayGame },
        template: '<PlayGame v-bind="$props" />',
    }),
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
};
