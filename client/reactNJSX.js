import React from 'react'

const {createElement} = React
const {assign} = Object
const {isArray} = Array

export function njsxComponent(builder){ return (...args) => builder(...args).createElement() }
export class NJSXComponent extends React.Component {
	render() {return this.renderer().createElement() }
}

export function njsxElement(type, props={}, ...children) {
	const builder = (...args) => {
		const finalProps = assign({},props)
		const finalChildren = [...children]

		for(const arg of args) {
			switch(typeof(arg)) {
				case 'string':
					if(arg.trim().startsWith('.')) {
						const newClasses = arg.split('.').join(' ').trim()
						const oldClasses = finalProps.className ? `${finalProps.className} ` : ''
						if(newClasses || oldClasses) assign(finalProps, {className: `${oldClasses}${newClasses}`})
					} else finalChildren.push(arg)
					break
				case 'function':
					finalChildren.push(arg.createElement())
					break
				case 'object':
					if(isArray(arg))
						for(const child of arg)
							finalChildren.push(typeof(child) === 'function' ? child.createElement() : child)
					else if(arg.props) finalChildren.push(arg)
					else assign(finalProps, arg)
					break
				default:
					finalChildren.push(arg)
			}
		}

		return njsxElement(type, finalProps, ...finalChildren)
	}
	builder.isNJSX = true
	builder.createElement = () => {
		// const adaptedType = typeof(type) === 'function'
		// 	? (...args) => {
		// 		const r = type(...args)
		// 		r.createElement ? r.createElement() : r
		// 	}
		// 	: type
		// return createElement(adaptedType, props, ...children)
		const e = createElement(type, props, ...children)
		return createElement(type, props, ...children)
	}
	return builder
}

export const a = njsxElement('a')
export const abbr = njsxElement('abbr')
export const address = njsxElement('address')
export const area = njsxElement('area')
export const article = njsxElement('article')
export const aside = njsxElement('aside')
export const audio = njsxElement('audio')
export const b = njsxElement('b')
export const base = njsxElement('base')
export const bdi = njsxElement('bdi')
export const bdo = njsxElement('bdo')
export const big = njsxElement('big')
export const blockquote = njsxElement('blockquote')
export const body = njsxElement('body')
export const br = njsxElement('br')
export const button = njsxElement('button')
export const canvas = njsxElement('canvas')
export const caption = njsxElement('caption')
export const cite = njsxElement('cite')
export const code = njsxElement('code')
export const col = njsxElement('col')
export const colgroup = njsxElement('colgroup')
export const data = njsxElement('data')
export const datalist = njsxElement('datalist')
export const dd = njsxElement('dd')
export const del = njsxElement('del')
export const details = njsxElement('details')
export const dfn = njsxElement('dfn')
export const dialog = njsxElement('dialog')
export const div = njsxElement('div')
export const dl = njsxElement('dl')
export const dt = njsxElement('dt')
export const em = njsxElement('em')
export const embed = njsxElement('embed')
export const fieldset = njsxElement('fieldset')
export const figcaption = njsxElement('figcaption')
export const figure = njsxElement('figure')
export const footer = njsxElement('footer')
export const form = njsxElement('form')
export const h1 = njsxElement('h1')
export const h2 = njsxElement('h2')
export const h3 = njsxElement('h3')
export const h4 = njsxElement('h4')
export const h5 = njsxElement('h5')
export const h6 = njsxElement('h6')
export const head = njsxElement('head')
export const header = njsxElement('header')
export const hgroup = njsxElement('hgroup')
export const hr = njsxElement('hr')
export const html = njsxElement('html')
export const i = njsxElement('i')
export const iframe = njsxElement('iframe')
export const img = njsxElement('img')
export const input = njsxElement('input')
export const ins = njsxElement('ins')
export const kbd = njsxElement('kbd')
export const keygen = njsxElement('keygen')
export const label = njsxElement('label')
export const legend = njsxElement('legend')
export const li = njsxElement('li')
export const link = njsxElement('link')
export const main = njsxElement('main')
export const map = njsxElement('map')
export const mark = njsxElement('mark')
export const menu = njsxElement('menu')
export const menuitem = njsxElement('menuitem')
export const meta = njsxElement('meta')
export const meter = njsxElement('meter')
export const nav = njsxElement('nav')
export const noscript = njsxElement('noscript')
export const object = njsxElement('object')
export const ol = njsxElement('ol')
export const optgroup = njsxElement('optgroup')
export const option = njsxElement('option')
export const output = njsxElement('output')
export const p = njsxElement('p')
export const param = njsxElement('param')
export const picture = njsxElement('picture')
export const pre = njsxElement('pre')
export const progress = njsxElement('progress')
export const q = njsxElement('q')
export const rp = njsxElement('rp')
export const rt = njsxElement('rt')
export const ruby = njsxElement('ruby')
export const s = njsxElement('s')
export const samp = njsxElement('samp')
export const script = njsxElement('script')
export const section = njsxElement('section')
export const select = njsxElement('select')
export const small = njsxElement('small')
export const source = njsxElement('source')
export const span = njsxElement('span')
export const strong = njsxElement('strong')
export const style = njsxElement('style')
export const sub = njsxElement('sub')
export const summary = njsxElement('summary')
export const sup = njsxElement('sup')
export const table = njsxElement('table')
export const tbody = njsxElement('tbody')
export const td = njsxElement('td')
export const textarea = njsxElement('textarea')
export const tfoot = njsxElement('tfoot')
export const th = njsxElement('th')
export const thead = njsxElement('thead')
export const time = njsxElement('time')
export const title = njsxElement('title')
export const tr = njsxElement('tr')
export const track = njsxElement('track')
export const u = njsxElement('u')
export const ul = njsxElement('ul')
export const variable = njsxElement('var')
export const video = njsxElement('video')
export const wbr = njsxElement('wbr')
export const circle = njsxElement('circle')
export const clipPath = njsxElement('clipPath')
export const defs = njsxElement('defs')
export const ellipse = njsxElement('ellipse')
export const g = njsxElement('g')
export const image = njsxElement('image')
export const line = njsxElement('line')
export const linearGradient = njsxElement('linearGradient')
export const mask = njsxElement('mask')
export const path = njsxElement('path')
export const pattern = njsxElement('pattern')
export const polygon = njsxElement('polygon')
export const polyline = njsxElement('polyline')
export const radialGradient = njsxElement('radialGradient')
export const rect = njsxElement('rect')
export const stop = njsxElement('stop')
export const svg = njsxElement('svg')
export const text = njsxElement('text')
export const tspan = njsxElement('tspan')