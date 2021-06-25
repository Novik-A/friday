import React, {ChangeEvent, useState} from "react";
import SuperInputText from "../../d1-main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../d1-main/ui/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../d1-main/ui/common/c3-SuperCheckbox/SuperCheckbox";

export const TestPage = () => {
    const [text, setText] = useState<string>("");
    const error = text ? "" : "error";
    const showAlert = () => {
        if (error) {
            alert("введите текст...");
        } else {
            alert(text);
        }
    }

    const [checked, setChecked] = useState<boolean>(false);
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked);
    return (
        <div>
            <div>TestPage</div>
            <div>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                />
                <SuperButton onClick={showAlert}>delete</SuperButton>
                <SuperCheckbox checked={checked} onChangeChecked={setChecked}>some text</SuperCheckbox>
                <SuperCheckbox checked={checked} onChange={testOnChange}/>
            </div>

        </div>
    );
}