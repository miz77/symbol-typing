/* @flow */
import React from 'react'
import styles from './styles.css'
import type {Action} from './reducers'


export default class Typing extends React.Component {
    constructor(props) {
        super(props)
    }

    focus() {
        this.typeInput.focus();
    }


    componentDidMount() {
        this.focus();
        this.intervalId = window.setInterval(this.focus.bind(this), 500)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }


    keyPress(event) {
        this.props.dispatch({type: "INPUT", key: event.key})
    }

    statusToClassName(status) {
        switch (status) {
            case 0:
                return styles.before_type
            case 1:
                return styles.target_type
            case 2:
                return styles.after_type
        }
    }

    toggleMute() {
        this.props.dispatch({type: "TOGGLE_MUTE"})
    }

    toggleShake() {
        this.props.dispatch({type: "TOGGLE_SHAKE"})
    }

    handleAnimationEnd() {
        this.props.dispatch({type: "CLEAR_SHAKE"})
    }

    render() {
        const {questions, finished, count, isMuted, isShakeEnabled, shaking} = this.props

        let display = questions.map((item, index) => {
            let className = styles.each_string + " " + this.statusToClassName(item.status)
            if (shaking && item.status === 1) {
                className += " " + styles.shake
            }
            return <span
                key={index}
                className={className}
                onAnimationEnd={item.status === 1 ? this.handleAnimationEnd.bind(this) : undefined}
            >
                {item.word}
            </span>
        })

        return <div className={styles.Typing}>
            <div className={styles.controls}>
                <button
                    className={styles.toggle_btn + (isMuted ? " " + styles.toggle_off : "")}
                    onClick={this.toggleMute.bind(this)}
                    title={isMuted ? "サウンドON" : "ミュート"}
                >
                    {isMuted ? "🔇 Mute" : "🔊 Sound"}
                </button>
                <button
                    className={styles.toggle_btn + (!isShakeEnabled ? " " + styles.toggle_off : "")}
                    onClick={this.toggleShake.bind(this)}
                    title={isShakeEnabled ? "振動OFF" : "振動ON"}
                >
                    {isShakeEnabled ? "📳 Shake" : "⏹ Shake"}
                </button>
            </div>
            <div className={styles.text}>
                {display}
            </div>
            <input
                type="text"
                ref={(input) => { this.typeInput = input; }}
                onKeyDown={(e) => { if (e.key.length === 1) this.keyPress(e); }}/>

            {
                (() => {
                    if (finished) {
                        return <div>
                            Finished! {count} / {questions.length}
                        </div>
                    }
                })()
            }
        </div>
    }

}
