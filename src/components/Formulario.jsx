import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("Hay al menos uno vacio");

      setError(true);
      return;
    }

    setError(false);

    // Crear un objeto de paciente que contiene toda su info
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    if(paciente.id) {
        // Editando el Registro
        objetoPaciente.id = paciente.id;
        
        const pacientesActualizados = pacientes.map( pacientesState => pacientesState.id === paciente.id
          ? objetoPaciente : pacientesState );

          setPacientes(pacientesActualizados);
          setPaciente({})
    } else {
        // Nuevo registro
        objetoPaciente.id = generarId();
        setPacientes([...pacientes, objetoPaciente]);
    }
    
    // Reiniciar el form
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-4 md:m-0"
        action=""
      >
        {error && (
          <Error>
            {" "}
            <p>Todos los campos son obligatorios</p>
          </Error>
        )}
        <div className="mb-5">
          <label
            className="block text-gray-700 font-bold uppercase"
            htmlFor="mascota"
          >
            Nombre Mascota
          </label>

          <input
            type="text"
            id="mascota"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 font-bold uppercase"
            htmlFor="propietario"
          >
            Nombre propietario
          </label>

          <input
            type="text"
            id="propietario"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 font-bold uppercase"
            htmlFor="email"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 font-bold uppercase"
            htmlFor="alta"
          >
            Alta
          </label>

          <input
            type="date"
            id="alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 font-bold uppercase"
            htmlFor="sintomas"
          >
            Sintomas
          </label>

          <textarea
            className="block px-2 text-gray-700  w-full max-w-full"
            id="sintomas"
            placeholder="Describe lo sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase
            font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;
