import Input from "./Input"
import Button from "./Button"

import { useForm } from 'react-hook-form'
import { server_calls } from '../api/server'
import { useDispatch, useStore } from 'react-redux'
import { chooseMake, chooseModel, chooseYear, chooseColor, chooseCondition, chooseMiles } from '../redux/slices/RootSlice'

interface CarFormProps {
    id?: string[]
}

const CarForm = (props: CarFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${props.id}`);
    if (props.id && props.id.length > 0) {
        server_calls.update(props.id[0], data)
        console.log(`Updated: ${ data } ${ props.id }`);
        setTimeout( () => {window.location.reload()}, 1000);
        event.target.reset()
    } else {
        dispatch(chooseMake(data.make));
        dispatch(chooseModel(data.model));
        dispatch(chooseYear(data.year));
        dispatch(chooseColor(data.color));
        dispatch(chooseCondition(data.condition));
        dispatch(chooseMiles(data.miles));

        server_calls.create(store.getState())
        setTimeout( () => {window.location.reload()}, 1000);
    }
    
  }

  return (


    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="make">Car Make</label>
                <Input {...register('make')} name="make" placeholder="Make"/>
            </div>
            <div>
                <label htmlFor="model">Car Model</label>
                <Input {...register('model')} name="model" placeholder="Model"/>
            </div>
            <div>
                <label htmlFor="year">Car Year</label>
                <Input {...register('year')} name="year" placeholder="Year"/>
            </div>
            <div>
                <label htmlFor="color">Car Color</label>
                <Input {...register('color')} name="color" placeholder="Color"/>
            </div>
            <div>
                <label htmlFor="condition">Car Condition</label>
                <Input {...register('condition')} name="condition" placeholder="Condition"/>
            </div>
            <div>
                <label htmlFor="miles">Car Miles</label>
                <Input {...register('miles')} name="miles" placeholder="Miles"/>
            </div>
            <div className="flex p-1">
                <Button
                className="flex justify-center w-full m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
                >
                    Submit
                </Button>
            </div>
        </form>
    </div>
  )
}

export default CarForm