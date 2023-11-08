import HelloWorld from '@/components/HelloWorld.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Pages/PlayGame',
    component: HelloWorld,
    tags: ['autodocs'],
    render: () => ({
        components: { HelloWorld },
        template: '<HelloWorld v-bind="$props" />',
    }),
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
};
