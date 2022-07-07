import { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useMatchMutate from "../../hooks/matchMutate";
import useRemoteMapLocations from "../../hooks/remote/useRemoteMapLocations";
import useAxios from "../../hooks/useAxios";

const center = [-5.388445, 105.233385];

const Mapper = () => {
  const { data: newDataLocation } = useRemoteMapLocations();
  const matchMutate = useMatchMutate();

  const { register, handleSubmit } = useForm();

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [position, setPosition] = useState(center);
  const [isLoading, setIsLoading] = useState(false);

  const [, executePostLocation] = useAxios(
    { url: "/locations", method: "POST" },
    { manual: true }
  );

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
            setLat(marker.getLatLng().lat);
            setLng(marker.getLatLng().lng);
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "silahkan Drag map lokasi"
              : "Klik untuk memindahkan lokasi"}
          </span>
        </Popup>
      </Marker>
    );
  }
  const onSubmit = async (data) => {
    const requestPayload = {
      lat: lat,
      long: lng,
      range: data.range,
    };
    setIsLoading(true);
    try {
      await executePostLocation({ data: requestPayload });
      matchMutate(/\/locations/);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col">
      <MapContainer center={center} zoom={18} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker />
      </MapContainer>
      <div className="flex flex-row mt-5"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center">
          <input
            id="range"
            name="text"
            type="number"
            autoComplete="text"
            required
            className="w-1/5 mr-3 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Tambah Jarak Lokasi"
            {...register("range")}
          />
          <span>Meter</span>
        </div>
        <button
          type="submit"
          className="bg-green-700 font-semibold p-3 text-white rounded-md mt-5"
        >
          {isLoading ? "...Loading" : "Ambil Lokasi"}
        </button>
      </form>
      <div className="mt-10">
        <table className="w-1/2">
          <thead className="bg-gray-50 border">
            <tr>
              <th className="px-6 py-2 text-xs text-gray-500">Lat</th>
              <th className="px-6 py-2 text-xs text-gray-500">Lang</th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Jarak - Location
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-center">
            <tr className="whitespace-nowrap">
              <td className="px-6 py-4 text-sm text-gray-500">
                {newDataLocation?.data.lat}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {newDataLocation?.data.long}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {newDataLocation?.data.range} Meter
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mapper;
