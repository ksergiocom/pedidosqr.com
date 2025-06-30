import React from 'react';
import { useForm } from '@inertiajs/react';
import CustomInput from '@/components/CustomInput';
import GestionLayout from '../Layout/GestionLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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

      <form className="mt-8" onSubmit={handleSubmit}>
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
