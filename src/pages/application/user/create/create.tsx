import { useCreate, useCustom } from '@refinedev/core';
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

function UserCreate() {
  const theme = useTheme();
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
    },
  });
  // const { mutate: mutateCreateUser, overtime } = useCreate({
  //   resource: 'user/signup',
  //   meta: {
  //     headers: {
  //       "Content-Type": "application/json",
  //     }
  //   },
  //   successNotification: () => {
  //     return {/
  //       message: `Created Successfully.`,
  //       description: "Success with no errors",
  //       type: "success",
  //     };
  //   },
  // })
  const {
    data,
    isLoading,
    refetch: createUser,
  } = useCustom<any>({
    url: `https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/user/signup`,
    method: 'post',
    queryOptions: {
      enabled: false,
    },
    config: {
      headers: {
        'Content-Type': 'application/json',
      },
      payload: {
        data: {
          avatar:
            'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/009d272e2b496aa0758a86a17eac5f7716a99133_full.jpg',
          firstName: 'Tony' + Date.now(),
          lastName: 'Nguyen' + Date.now(),
          email: `tony${Date.now()}@gmail.com`,
          role: 'operator',
          password: '123456',
        },
      },
    },
  });
  const { data: dataCurrency } = useCustom<any>({
    url: `https://jsonplaceholder.typicode.com/users?_page=1&_limit=3`,
    method: 'get',
    queryOptions: {
      // enabled: false,
      retry: 0,
      staleTime: Infinity,
    },
  });

  console.log('dataCurrency: ', dataCurrency);

  function onSubmit() {
    createUser();
    // mutateCreateUser({
    //   values: {
    //     data: {
    //       avatar: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/009d272e2b496aa0758a86a17eac5f7716a99133_full.jpg',
    //       firstName: 'Tony' + Date.now(),
    //       lastName:'Nguyen' + Date.now(),
    //       email: `tony${Date.now()}@gmail.com`,
    //       role: 'operator',
    //       password: '123456',
    //     }
    //   }
    // });
  }

  return (
    <Create
      breadcrumb={<></>}
      title="Create User"
      saveButtonProps={{
        onClick: onSubmit,
        disabled: !isLoading,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginBottom: 2 }}>
        <TextField fullWidth label="First Name" name="firstName" />
        <TextField fullWidth label="Last Name" name="lastName" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginBottom: 2 }}>
        <TextField fullWidth label="Email" />
        <TextField select fullWidth label="Role">
          {['admin', 'operator', 'member'].map((item) => (
            <MenuItem key={item} value={item}>
              {item.toUpperCase()}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          // value={age}
          label="Currency"
          // onChange={handleChange}
        >
          {dataCurrency?.data.map((item: any) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </Create>
  );
}

export default UserCreate;
