export const revalidate = 0;

import {  getPaginatedUsers } from '@/action';
import { Pagination, Title } from '@/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function OrdersPage() {

  const { ok, users = []} = await getPaginatedUsers();

  if( !ok ){
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Mantenimiento los usuarios" />

      <div className="mb-10">
        <UsersTable users={ users }/>

        <Pagination totalPages={ 1 } />
      </div>
    </>
  );
}