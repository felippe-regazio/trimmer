import Button from '@material-ui/core/Button'

export default [
  {
    label: 'Select campaign settings',
    content: <>
      <Button variant="contained" color="primary" component="label">
        <input type="file" hidden />
        Add Videos
      </Button>
    </>,
  },

  {
    tabel: 'Create an ad group',
    content:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },

  {
    label: 'Create an ad',
    content: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
]