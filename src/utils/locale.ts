import content from '../../content'

//TODO: fix
const lang = 'en'

export function getText(text: string): string {
    return content[lang][text] ? content[lang][text] : text
}
