import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSubmit from '../hooks/useSubmit';

type RefButtonLoginProps = {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  setRef: React.Dispatch<React.SetStateAction<RefObject | null>>
}

function RefButtonLogin({ setToken, token, setRef }: RefButtonLoginProps) {
  const { loading, error, success, fetchData } = useSubmit();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('token')) {
      setToken(searchParams.get('token'));
      handleSubmit(searchParams.get('token'));
    } else if (localStorage.getItem('refToken')) {
      setToken(localStorage.getItem('refToken'));
      handleSubmit(localStorage.getItem('refToken'));
    }
  }, [searchParams]);

  async function handleSubmit(refToken: any): Promise<void> {
    const data: any = await fetchData(
      `/auth/ref?token=${refToken}`,
      'GET',
      null,
      null
    );
    if (data) {
      setRef(data);
      localStorage.setItem('refToken', refToken);
    }
    if (!data) localStorage.removeItem('refToken');
  }

  return (
    <div className='min-w-full min-h-screen flex items-center justify-center'>
      <div className='flex justify-center items-center'>
        <div className='relative h-full items-center'>
          <div className='artboard rounded-lg p-4 phone-1 bg-white'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(token);
              }}
            >
              <div className='m-auto h-3/4 flex flex-col items-center'>
                <div className='py-4 font-semibold text-xl'>Token</div>
                <input
                  type='text'
                  placeholder='Token eingeben'
                  className='mt-20 input input-bordered w-full max-w-xs m-auto'
                  onInput={(e: any) => {
                    e.preventDefault();
                    setToken(e.target.value);
                  }}
                />

                <button
                  className={`btn my-4 ${loading && 'loading'} ${
                    error && 'btn-error'
                  } ${success && 'btn-success'}`}
                  type='submit'
                >
                  Senden
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefButtonLogin;
