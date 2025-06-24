import classes from './DefaultInput.module.css'

export default function DefaultInput(params) { 
  return (
    <>
      <input type='text' className={classes.input} {...params} />
    </>
  )
}
