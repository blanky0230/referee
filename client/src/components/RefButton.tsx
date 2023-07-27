import useSubmit from '../hooks/useSubmit';

type propTypes = {
  color: 'red' | 'blue' | 'yellow' | 'white' | 'gray';
  title: 'Weiß' | 'Rot' | 'Gelb' | 'Blau' | 'Start' | 'Reset';
  url: string;
  method: 'POST' | 'GET';
};

function RefButton({ color, title, url, method }: propTypes) {
  const { loading, error, success, fetchData } = useSubmit();
  return (
    <button
      className={`w-full h-full text-3xl text-gray-900 border-2 border-gray-700 hover:opacity-75 disabled:bg-gray-200 ${
        color === 'blue' && 'bg-blue-600'
      } ${color === 'red' && 'bg-red-600'} ${
        color === 'yellow' && 'bg-yellow-600'
      } ${color === 'white' && 'bg-white'} ${
        color === 'gray' && 'bg-gray-300'
      } text-center p-4 rounded-md hover:cursor-pointer ${
        loading && 'loading'
      } ${error && 'btn-error'} ${success && 'btn-success'}`}
      onClick={() => fetchData(url, method)}
    >
      {title}
    </button>
  );
}

export default RefButton;
