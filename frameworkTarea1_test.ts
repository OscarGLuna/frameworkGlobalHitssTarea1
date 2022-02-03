import {
	mockDataForCharizard,
	mockForPokemonJSON,
} from './mockDataForHomework'


Feature( 'Tarea 1 del framework interno de Global Hitss: Prueba del método GET de una API REST y de GraphQL.' )

Scenario( 'Test backend REST GET, PokeAPI', async ({ I }) => {
	const charizard = await I.sendGetRequest(
		'https://pokeapi.co/api/v2/pokemon/charizard'
	)
    const pikachu = await I.sendGetRequest(
		'https://pokeapi.co/api/v2/pokemon/pikachu'
	)
    const response = await I.sendGetRequest(
		'https://pokeapi.co/api/v2/pokemon/pikachu'
	)

    	// Validamos el codigo de respuesta correcto
	I.assertEqual(charizard?.status, 200)

    // Validacion sobre la data por individual, ej: habilidades iniciales
    I.assertEqual( charizard?.data?.abilities?.[0]?.ability?.name, 'blaze' )
    I.assertEqual( charizard?.data?.abilities?.[0]?.is_hidden, false )
	I.assertEqual( charizard?.data?.abilities?.[1]?.ability?.name, 'solar-power' )
    I.assertEqual( charizard?.data?.abilities?.[1]?.is_hidden, true )

    //Validación negativa de datos
    I.assertNotEqual( charizard?.data?.sprites?.versions['generation-ii']?.crystal?.back_default, 'https://youtube.com')
    I.assertNotEqual( charizard?.data?.sprites?.versions['generation-iii']?.emerald?.front_default, 'https://google.com')
	   I.assertNotEqual( charizard?.data?.stats?.[0].stat.name, 'attack' )
    I.assertNotEqual( charizard?.data?.weight, 800 )

    // Validar tipo de Dato
	I.assertToBeA( charizard?.data?.abilities?.[0]?.ability?.name,'string' )
	I.assertToBeA( charizard?.data?.abilities?.[1]?.is_hidden, 'boolean' )

    //Validar datos de las habilidades del pokémon
    I.assertDeepEqual( charizard?.data?.abilities, mockDataForCharizard )

    //Validación negativa de las habilidades del pokémon
    I.assertNotDeepEqual( pikachu?.data?.abilities, mockDataForCharizard )

    //Validar datos del JSON
    I.assertJsonSchema( response?.data, mockForPokemonJSON )

    })


    //Test de backend GRAPHQL GET usando https://graphql-pokeapi.graphcdn.app/
    Scenario('Test de backend GRAPHQL GET', async ({ I }) => {
        const berriesResponse = await I.sendQuery(`{
            berries {
              count
              next
              previous
              results {
                name
                url
              }
            }
          }`)
          const encounterResponse = await I.sendQuery(`{
            encounterMethods  {
              count
              next
              previous
              results {
                url
                name
              }
            }
          }`)

        // Validamos el codigo de respuesta correcto y no regresa nada
        I.assertEqual( berriesResponse?.status, 200 )
        I.assertEqual( berriesResponse?.data?.data?.berries?.results?.[0]?.name, 'cheri' )
        I.assertNotEqual( berriesResponse?.data?.data?.berries?.results?.[0]?.url, 'https://pokemon.com' )
 
        I.assertToBeA( encounterResponse?.data?.data?.encounterMethods?.count,'number' )
        I.assertToBeA( encounterResponse?.data?.data?.encounterMethods?.results?.[6]?.name, 'string' )


    })