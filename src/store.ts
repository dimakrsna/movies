import { observable, action } from 'mobx'

export const store = observable(
	{
		inputValue: '',

		setInputValue(value: string) {
			this.inputValue = value
		}
	},
	{
		setInputValue: action
	}
)

// class Store {
//     @observable
//     inputValue =  ''

//     @action
//     setInputValue(value: string){
//         console.log('this', this)
//         console.log('value', value)
//         // this.inputValue = value
//     }
// }

// export const store = new Store()

