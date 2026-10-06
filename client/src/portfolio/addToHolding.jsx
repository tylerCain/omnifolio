import { useQueryClient } from 'react-query'
import { useForm, Controller } from "react-hook-form"
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import { useEditHolding } from '../connectors/portfolio'

const UpdateHolding = ({ holdings, setView, view }) => {
  const { control, handleSubmit, reset, register } = useForm({
    defaultValues: {
      coinId: '',
      amount: '',
      purchasePrice: '',
    }
  })

  console.log('update', holdings)

  const queryClient = useQueryClient()
  const updateHoldingMutation = useEditHolding({
    onSuccess: () => {
      queryClient.invalidateQueries('portfolio')
      queryClient.invalidateQueries('portfolio-prices')
      reset()
    },
    onError: error => {
      console.log('Mutation error', error.message)
    }
  })

  const onSubmit = (data) => {
    console.log('mutating')
    updateHoldingMutation.mutate(data)
    setView('')
  }

  const handleChange = (event) => {
    setView(event.target.value)
  }

  return (
    <Box sx={{ mx: 'auto', border: '4px solid #C3E0E5', width: '60%', padding: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mx: 'auto', padding: 1}}>
          <Controller
            name="coinId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select sx={{  height: '25%', width: '100%', marginY: 2 }} label="Coin" value={view} onChange={handleChange} {...register("coinId")} {...field}>
                {holdings.map(holding => (
                  <MenuItem value={holding.coinId}>{holding.coinId}</MenuItem>
                ))}
              </Select>
            )}
            //render={({ field }) => <TextField label="Coin" variant="standard" {...field} {...register("coinId", { required: true })}/>}
          />
          <Controller
            name="amount"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField x={{ marginY: 2}} label="Amount" variant="standard" {...field} />}
          />
          <Controller
            name="purchasePrice"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField sx={{ marginY: 2}} label="Purchase Price" variant="standard" {...field} />}
          />
          <br />
          <Button variant="outlined" type="submit" sx={{ width: '50%', ml: 5}}>Submit</Button>
        </Box>
      </form>
    </Box>
  )
}

export default UpdateHolding
