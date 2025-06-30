import React from 'react';
import { useForm } from '@inertiajs/react';
import CustomInput from '@/components/CustomInput';
import GestionLayout from '../Layout/GestionLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const MiPerfilPage = () => {
  const {
    data,
    setData,
    put,
    processing,
    errors,
  } = useForm({
    password_actual: '',
    password_nuevo: '',
    password_nuevo_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('auth.actualizar-contraseña'));
  };

  return (
    <div className="flex flex-col w-sm">
      <h1 className="text-4xl font-semibold">Mi perfil</h1>
      <p className="mt-2">
        Gestiona tu información y preferencias de cuenta desde aquí.
      </p>

      <Separator className="my-10" />

      <h2 className='text-2xl font-semibold'>Preferencias usuario</h2>
      
      <CustomInput
        label="Tiempo alerta mesa"
        className='mt-8'
        type="number"
        description='Minutos que deben pasar hasta que el pedido se marque con un aviso rojo'
      ></CustomInput>

      <div className="flex items-center space-x-2 mt-10">
        <Switch id="enable-toast" />
        <Label htmlFor="enable-toast">Activar mensajes</Label>
      </div>
      <p className='text-muted-foreground text-sm mt-2'>Los mensajes flotantes aparecen cuando se generan nuevos artículos, mesas o pedidos. También pueden avisar de eventos especiales</p>

      <Button disabled={processing} className="mt-10 w-full" variant='outline'>
        Cambiar preferencias
      </Button>


      <Separator className="my-10" />

      <form className="" onSubmit={handleSubmit}>
        <CustomInput
          label="Contraseña antigua"
          description="Por seguridad debes ingresar la contraseña antigua para modificarla por otra"
          value={data.password_actual}
          onChange={(e) => setData('password_actual', e.target.value)}
          error={errors.password_actual}
          type="password"
        />
        <CustomInput
          label="Nueva contraseña"
          className="mt-5"
          value={data.password_nuevo}
          onChange={(e) => setData('password_nuevo', e.target.value)}
          error={errors.password_nuevo}
          type="password"
        />
        <CustomInput
          label="Confirmación nueva contraseña"
          className="mt-5"
          value={data.password_nuevo_confirmation}
          onChange={(e) => setData('password_nuevo_confirmation', e.target.value)}
          error={errors.password_nuevo_confirmation}
          type="password"
        />
        <Button disabled={processing} className="mt-10 w-full">
          Cambiar contraseña
        </Button>

        <Separator className="my-10" />

        <p className="text-sm text-muted-foreground">
          Si no te acuerdas de la contraseña puedes recuperarla usando tu email. Pulsa aquí para que te enviemos un link de recuperación.
        </p>
      </form>
    </div>
  );
};

MiPerfilPage.layout = (page) => <GestionLayout children={page} title="Mi perfil" />;

export default MiPerfilPage;
