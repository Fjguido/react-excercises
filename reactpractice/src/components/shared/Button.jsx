import PropTypes from 'prop-types'

function button({ children, version, type, isDisabled }) {
  return (
    <button type={type} 
    disabled={isDisabled} 
    className={`btn btn-${version}`}>
        {children}
    </button>
  )
}

button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false,
}

button.propTypes = {
    children: PropTypes.node.isRequired,
    version: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
}

export default button