import React from "react";
import "./App.css";

const App = () => {
  // React hooks
  const [barang, setBarang] = React.useState([]);
  const [keranjang, setKeranjang] = React.useState([]);
  const [input, setInput] = React.useState({
    nama: "",
    harga: "",
  });

  const tambahBarang = () => {
    let tmp = barang;
    tmp.push(input);
    setBarang([...tmp]);
    setInput({
      nama: "",
      harga: "",
    });
  };

  const TotalHarga = () => {
    let total = 0;
    keranjang.map((item) => {
      total += item.harga;
    });
    return <b>{intToRupiah(total)}</b>;
  };

  const tambahKeranjang = (item) => {
    let tmp = keranjang;
    tmp.push(item);
    setKeranjang([...tmp]);
  };

  const intToRupiah = (harga) => {
    return "Rp." + harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container max-w-screen-md  mx-auto md:px-0 px-4">
      <div className="flex flex-row mb-4 ">
        <div className="bg-green-400 flex flex-col mr-4 px-4 py-2 rounded ">
          <div className="mb-2">
            <p className="text-md font-bold mb-2">Nama barang:</p>
            <input
              className="border-2 rounded"
              value={input.nama}
              onChange={(item) => {
                setInput({
                  ...input,
                  nama: item.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <p className="text-md font-bold mb-2">Harga barang:</p>
            <input
              className="border-2 rounded"
              value={input.harga.toString()}
              onChange={(item) => {
                return setInput({
                  ...input,
                  harga: parseInt(item.target.value),
                });
              }}
              type="number"
            />
          </div>
          <button
            className="px-4 py-1 rounded bg-blue-500 font-bold text-white "
            onClick={() => tambahBarang()}
          >
            Tambah barang
          </button>
        </div>
        <div className="bg-green-400 flex flex-col mr-2 px-4 py-2 rounded w-1/2">
          <p className="text-md font-bold mb-2">Daftar Barang</p>
          {barang.length === 0 && (
            <p className="m-auto text-white font-bold">Tidak ada barang</p>
          )}
          {barang.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-purple-500 px-4 py-2 rounded flex flex-row align-middle justify-between mb-2"
              >
                <p className="font-bold text-white">
                  {capitalizeFirstLetter(item.nama)}, harga:{" "}
                  {intToRupiah(item.harga)}
                </p>
                <button
                  onClick={() => tambahKeranjang(item)}
                  className="bg-white text-blue-500 px-2 rounded align-middle justify-center"
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-green-400 flex flex-col mr-2 px-4 py-2 rounded">
        <p className="text-md font-bold mb-2">Keranjang</p>

        {keranjang.length === 0 && (
          <p className="m-auto text-white font-bold">keranjang kosong</p>
        )}
        {keranjang.map((barang, index) => {
          return (
            <div
              key={index}
              className="px-4 py-2 bg-blue-500 mb-2 flex flex-row justify-between rounded font-bold text-white"
            >
              <p>{capitalizeFirstLetter(barang.nama)}</p>
              <p>{intToRupiah(barang.harga)}</p>
            </div>
          );
        })}
        <div className="flex flex-row justify-between pr-4">
          <p>Total Harga:</p>
          <TotalHarga />
        </div>
      </div>
    </div>
  );
};

export default App;
