// --Función para agregar una ciudad a la interfaz
const agregarCiudad = async () => {
    // Obtener el valor del campo de entrada para la ciudad
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
  
    // Verificar si se proporcionó una ciudad válida
    if (city !== '') {
      // Llamar a la función clima para obtener datos y mostrar la tarjeta de la ciudad
      await clima(city);
      // Limpiar el campo de entrada después de agregar la ciudad
      cityInput.value = '';
    }
  };
  
  // --Función para eliminar todas las ciudades de la interfaz
  const eliminarCiudades = () => {
    // Obtener el contenedor de tarjetas
    const root = document.getElementById('root');
    // Limpiar todas las ciudades
    root.innerHTML = '';
  };
  
// --Función principal para obtener datos climáticos y mostrar tarjeta de la ciudad
const clima = async (city) => {
    // Construir la URL para la API del clima
    const url = `http://api.weatherapi.com/v1/current.json?key=c98b543956c04ae0b9a165730231211&q=${city}&aqi=no`;
  
    // Realizar la solicitud a la API del clima
    const response = await fetch(url);
    
    // Obtener los datos de la respuesta en formato JSON
    const result = await response.json();
  
    // Obtener el contenedor de tarjetas
    const cardsContainer = document.getElementById('root');
  
    // Crear una nueva tarjeta
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Asignar color de fondo según el estado del clima
    card.style.backgroundColor = asignarColorFondo(result.current.condition.text);
  
    // Insertar contenido HTML en la tarjeta
    card.innerHTML = `
      <h1>${result.location.name}</h1>
      <h2>${result.location.region}</h2>
      <h3>${result.location.country}</h3>
      <h4>${result.location.localtime}</h4>
      <h5>${result.current.temp_c}°C</h5>
      <h6>${result.current.condition.text}</h6>
      <img src="${result.current.condition.icon}" class="weather-icon">
    `;
  
    // Agregar la tarjeta al contenedor de tarjetas
    cardsContainer.appendChild(card);
  };
  
  // --Función para asignar un color de fondo según el estado del clima
  const asignarColorFondo = (estadoClima) => {
    switch (estadoClima.toLowerCase()) {
      case 'clear':
        return '#94D7F2';
      case 'partly cloudy':
        return '#ffe066';
      case 'cloudy':
        return '#a6a6a6';
      case 'fog':
        return '#d9d9d9';
      default:
        return '#fff';
    }
  };
  