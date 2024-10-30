import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "FilamentPHP Custom Fields",
    description: "Filament plugin that allows to add dynamic, user-defined form fields, enhancing the customization and functionality of admin panels.",
    base: '/custom-fields-community/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Documentation', link: '/introduction'},
            {text: 'Buy', link: 'https://relaticle.lemonsqueezy.com/buy/803d5933-4b12-4869-9d93-f96797339603'}
        ],

        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    {text: 'Introduction', link: '/introduction'},
                    {text: 'Installation', link: '/installation'}
                ]
            },
            {
                text: 'Usage',
                items: [
                    {
                        text: 'Setting Up', link: '/setting-up',
                    },
                    {
                        text: 'Configuration', link: '/configuration'
                    },
                    {
                        text: 'Presets', link: '/presets'
                    }
                ]
            },
            {
                text: 'Support & Contribution',
                items: [
                    {text: 'Support', link: '/support'},
                    {text: 'Contribution', link: '/contribution'}
                ]
            },
            {
                text: 'About',
                items: [
                    {text: 'License', link: '/license'},
                    {text: 'Code Distribution', link: '/code-distribution'},
                    {text: 'Changelog', link: '/changelog'}
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/Relaticle'}
        ]
    },
    ignoreDeadLinks: true
})
