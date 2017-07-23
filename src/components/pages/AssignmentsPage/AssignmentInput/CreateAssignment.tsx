import * as React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import TextField from 'material-ui/TextField'

import { InputStore } from './InputStore'

interface Props {
    inputStore: InputStore
}

/**
 * 填寫 Assignment 資料用的表單
 * 只負責更新 inputStore 的內容, 送出由 Dialog 上的按鈕處理
 */
@observer
export class CreateAssignment extends React.Component<Props> {
    @action.bound
    handleName(event, text: string) {
        this.props.inputStore.name = text
    }
    @action.bound
    handleDescription(event, text: string) {
        this.props.inputStore.description = text
    }
    @action.bound
    handleDataLink(event, text: string) {
        this.props.inputStore.data_link = text
    }

    render() {
        const { inputStore } = this.props
        return (
            <div>
                <TextField
                    type="text"
                    value={inputStore.name}
                    onChange={this.handleName}
                    required={true}
                    fullWidth={true}
                    hintText="作業名稱"
                    floatingLabelText="新作業名稱"
                />
                <br />
                <TextField
                    type="text"
                    value={inputStore.description}
                    onChange={this.handleDescription}
                    required={true}
                    multiLine={true}
                    fullWidth={true}
                    hintText="作業說明"
                    floatingLabelText="作業說明"
                />
                <br />
                <TextField
                    type="text"
                    value={inputStore.data_link}
                    onChange={this.handleDataLink}
                    required={true}
                    fullWidth={true}
                    hintText="http://example.com/"
                    floatingLabelText="參考連結"
                />
                <br />
            </div>
        )
    }
}
