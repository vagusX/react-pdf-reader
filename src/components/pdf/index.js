import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.css'

class PdfReader extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    host: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      viewer: false
    }
  }

  componentDidMount() {
    this.setState({
      viewer: true
    })
  }

  componentWillMount() {
    this.setState({
      viewer: false
    })
  }

  render() {
    const src = `${this.props.host}?file=${this.props.url}` // &width=`containt.clientWidth`&download=`url`
    return (
      <div className={styles.container}>
        { this.state.viewer && <iframe className={styles.viewer} src={src}></iframe> }
      </div>
    )
  }
}

export default PdfReader
