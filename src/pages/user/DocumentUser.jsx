import React, { useRef, useState } from "react";
import axios from "axios";
import ToastNotification from "../../components/toast/toast-notification";
import Logo from "../../assets/logoPDF.png"
import { useReactToPrint } from "react-to-print";
import { tanggalPDF } from "../../utils/helper";


const DocumentUser = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const ComponentToPDF = useRef();

  const handleExportPDF = useReactToPrint({
    content: () => ComponentToPDF.current,
    documentTitle: `Perkembangan_Latihan(SiAtlet).pdf`,
  });
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      e.target.value = null; // Reset the input value
      ToastNotification.error("Tolong unggah file PDF.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      ToastNotification.error("Tolong unggah file PDF sebelum mengirim.");
      return;
    }

    const formData = new FormData();
    formData.append("paymentSlip", selectedFile);

    try {
      const response = await axios.post("/upload-endpoint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File berhasil diunggah:", response.data);
      alert("Slip pembayaran TGR telah disimpan.");
    } catch (error) {
      console.error("Kesalahan saat mengunggah file:", error);
      ToastNotification.error(
        "Terjadi kesalahan saat mengunggah file. Silakan coba lagi."
      );
    }
  };
const sekarang = new Date();
const waktu = tanggalPDF(sekarang);


  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div ref={ComponentToPDF}>
        <div className="p-[80px] mb-3 none">
          <div className="flex border-b-4 border-black pb-3 items-center w-full px-5">
            <img className="w-[100px] absolute" src={Logo} alt="" />
            <div className=" flex justify-center w-full">
              <div className="text-center">
                <h1 className="text-[15px] font-bold">
                  PEMERINTA KABUPATEN MINAHASA UTARA
                </h1>
                <h1 className="text-[18px] font-bold">INSPEKTORAT</h1>
                <h1 className="text-[13px] font-bold">
                  Kompleks Perkantoran Pemkab Minahasa Utara, Kode Pos 95371
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center m-full">
            <h1 className="text-[20px] inline-block font-bold border-b-2 border-black">
              SURAT KETERANGAN
            </h1>
            <h1 className="text-[13px]">
              Nomor : 700/146/R.TPTGR/ITKB-MU/VVI/2023
            </h1>
          </div>
          <div className="">
            <p className="my-7">Yang bertanda tangan dibawah ini:</p>
            <div className="">
              <div className="flex w-full mb-1">
                <p className="absolute">Nama</p>
                <p className="ml-[100px]">:</p>
                <p className="ml-2">STEPHEN TUWAIDAN, S.Sos, M.Si</p>
              </div>
              <div className="flex w-full mb-1">
                <p className="absolute">NIP</p>
                <p className="ml-[100px]">:</p>
                <p className="ml-2">19720825 199903 1 005</p>
              </div>
              <div className="flex w-full ">
                <p className="absolute">Jabatan</p>
                <p className="ml-[100px]">:</p>
                <p className="ml-2">Plt. INSPEKTUR</p>
              </div>
            </div>

            <p className=" my-7">Menerangkan dengan benar bahwa:</p>
            <div className="">
              <div className="flex w-full mb-1">
                <p className="absolute">Nama</p>
                <p className="ml-[100px]">:</p>
                <p className="ml-2">{user && user.name}</p>
              </div>
              <div className="flex w-full mb-1">
                <p className="absolute">NIP</p>
                <p className="ml-[100px]">:</p>
                <p className="ml-2">{user && user.nip}</p>
              </div>
            </div>
          </div>
          <div className="my-5">
            <p className="font-normal">
              Yang bersangkutan berdasarkan data di Inspektorat{" "}
              <span className="font-bold">TIDAK TERSANGKUT</span> dengan
              Tuntutan Perbandaharaan Tuntutan Ganti Rugi (TPTGR) pada
              Pemerintahan Kabupaten Minahasa Utara baik temuan LHP Inspektorat,
              BPKP ataupun BPK.{" "}
            </p>
            <p>
              Dengan surat keterangan ini diberikan untuk digunakan seperluhnya
            </p>
          </div>
          <div className="flex justify-end">
            <div className="">
              <div className="flex w-full mb-1 pb-1">
                <p className="absolute">Dikeluarkan Di</p>
                <p className="ml-[130px]">:</p>
                <p className="ml-2">Airmadidi</p>
              </div>
              <div className="flex w-full mb-1  border-b border-black">
                <p className="absolute">Pada tanggal</p>
                <p className="ml-[130px]">:</p>
                <p className="ml-2">{waktu}</p>
              </div>
              <div className="mt-4 text-center">
                <h1 className="font-bold">Plt.INSPEKTUR</h1>
                <h1 className="font-bold">KABUPATEN MINAHASA UTARA</h1>
              </div>
              <div className="mt-[60px] text-center">
                <h1 className="font-bold border-b border-black">
                  STEPHEN TUWAIDAN, S.Sos, M.Si
                </h1>

                <h1 className="font-bold">PEMBINA TINGKAT I</h1>
                <h1 className="font-bold">NIP.19720825 199903 1 005</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md p-6 bg-white rounded-lg ">
        <div className="card-title">
          <h3 className="mb-4 text-xl font-semibold">Halo, {user.name}</h3>
        </div>
        <div className="card-body">
          <p className="mb-2 text-gray-600">
            Anda sudah tidak memiliki TGR dan sudah mengajukan permohonan bebas
            TGR.
          </p>
        </div>
        <div className="card-actions">
          <button className="w-full btn btn-primary" onClick={handleExportPDF}>
            Unduh dokumen bebas TGR
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUser;
