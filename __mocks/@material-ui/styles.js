const styles = jest.requireActual('@material-ui/styles');

const makeStyles = style => (props) => {
  // Apply theme to classes
  const classes = typeof style === 'function' ? style() : style;

  // Apply props to every key of each class, which is every key of classes
  const classesByProps = {};
  Object.keys(classes).forEach((classKey) => {
    const classByProps = {};

    Object.keys(classes[classKey]).forEach((key) => {
      classByProps[key] = typeof classes[classKey][key] === 'function' ? classes[classKey][key](props) : classes[classKey][key];
    });

    classesByProps[classKey] = classByProps;
  });

  return classesByProps;
};

module.exports = { ...styles, makeStyles };
