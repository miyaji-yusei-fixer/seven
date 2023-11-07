const path = require('path')
const rootPath = path.resolve(__dirname, '../src')

module.exports = ({ config }) => {
    config.resolve.alias['@'] = rootPath
    config.resolve.alias['@components'] = `${rootPath}/components`
    config.resolve.alias['@assets'] = `${rootPath}/assets`

    config.module.rules.push({
        test: /\.s(c|a)ss$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'sass-loader',
            },
        ],
    })

    return config
}
