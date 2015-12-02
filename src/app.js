import React from 'react'

import PdfReader from './components/pdf'

import styles from './main.css'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  render() {
    const url = 'http://vagusx.github.io/pdfjs-v0.0.2/page.pdf'
    const staticHost = 'http://vagusx.github.io/pdfjs-v0.0.2/viewer.html'
    return (
      <div>
        <div className={styles.options}>
          <button onClick={this.showModal}>开始阅读PDF</button>
          <button onClick={this.closeModal}>关闭</button>
        </div>
        <div className={styles.wrapper}>
          { this.state.visible && <PdfReader url={url} host={staticHost} /> }
        </div>
      </div>
    )
  }

  showModal() {
    this.setState({
      visible: true
    })
  }

  closeModal() {
    this.setState({
      visible: false
    })
  }
}

export default App
