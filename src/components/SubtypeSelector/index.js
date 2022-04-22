import { Box } from "@mui/system"
import { Select, FormControl } from '@mui/material'

export default function SubtypeSelector({ value, setValue }) {
  return (
    <FormControl>
      <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Tipo/Subtipo</Box>
      <Select native name="subtype" value={value} onChange={setValue}>
        <option aria-label="None" value={'0'} />
        <optgroup label="Apartamento">
          <option value={'1'}>Alto Padrão</option>
          <option value={'2'}>Cobertura</option>
          <option value={'3'}>Cobertura Duplex</option>
          <option value={'4'}>Cobertura Triplex</option>
          <option value={'5'}>Duplex</option>
          <option value={'6'}>Flat</option>
          <option value={'7'}>Garden</option>
          <option value={'8'}>Loft</option>
          <option value={'9'}>Padrão</option>
          <option value={'10'}>Penthouse</option>
          <option value={'11'}>Kitnet</option>
          <option value={'12'}>Térreo</option>
          <option value={'13'}>Triplex</option>
          <option value={'14'}>Conjugado</option>
          <option value={'15'}>Cobertura Linear</option>
        </optgroup>
        <optgroup label="Casa">
          <option value={'16'}>Alto Padrão</option>
          <option value={'17'}>Alvenaria</option>
          <option value={'18'}>Em condomínio</option>
          <option value={'19'}>Germinada</option>
          <option value={'20'}>Linear</option>
          <option value={'21'}>Madeira</option>
          <option value={'22'}>Mista</option>
          <option value={'23'}>Padrão</option>
          <option value={'24'}>Kitnet</option>
          <option value={'25'}>Sobrado</option>
          <option value={'26'}>Sobreposta</option>
          <option value={'27'}>Térrea</option>
          <option value={'28'}>Triplex</option>
          <option value={'29'}>Vila</option>
          <option value={'30'}>Pré-moldada</option>
          <option value={'31'}>Sobreloja</option>
          <option value={'32'}>Chalé</option>
        </optgroup>
        <optgroup label="Terreno">
          <option value={'33'}>Em condomínio</option>
          <option value={'34'}>Lote</option>
          <option value={'35'}>Tereno</option>
          <option value={'36'}>Em loteamento</option>
        </optgroup>
        <optgroup label="Sítio">
          <option value={'37'}>Sítio</option>
          <option value={'38'}>Haras</option>
        </optgroup>
        <optgroup label="Garagem">
          <option value={'39'}>Garagem externa</option>
          <option value={'40'}>Garagem externa coberta</option>
          <option value={'41'}>Garagem interna</option>
        </optgroup>
        <optgroup label="Fazenda">
          <option value={'42'}>Fazenda</option>
          <option value={'43'}>Haras</option>
          <option value={'44'}>Pecuária</option>
          <option value={'45'}>Lavoura</option>
          <option value={'46'}>Mista</option>
        </optgroup>
        <optgroup label="Chácara">
          <option value={'47'}>Chácara</option>
        </optgroup>
        <optgroup label="Rancho">
          <option value={'48'}>Rancho</option>
        </optgroup>
        <optgroup label="Pousada">
          <option value={'49'}>Pousada</option>
        </optgroup>
        <optgroup label="Sala">
          <option value={'50'}>Andar comercial</option>
          <option value={'51'}>Comercial</option>
        </optgroup>
        <optgroup label="Loja">
          <option value={'52'}>Loja</option>
          <option value={'53'}>Ponto comercial</option>
        </optgroup>
        <optgroup label="Flat">
          <option value={'54'}>Flat</option>
        </optgroup>
        <optgroup label="Sobrado">
          <option value={'55'}>Alto padrão</option>
          <option value={'56'}>Em condomínio</option>
          <option value={'57'}>Germinado</option>
          <option value={'58'}>Padrão</option>
        </optgroup>
        <optgroup label="Prédio">
          <option value={'59'}>Comercial</option>
          <option value={'60'}>Residêncial</option>
        </optgroup>
        <optgroup label="Indústria">
          <option value={'61'}>Indústria</option>
        </optgroup>
        <optgroup label="Pavilhão/Galpão">
          <option value={'62'}>Industrial</option>
          <option value={'63'}>Salão comercial</option>
        </optgroup>
        <optgroup label="Área">
          <option value={'64'}>Comercial</option>
          <option value={'65'}>Industrial</option>
          <option value={'66'}>Residêncial</option>
          <option value={'67'}>Residêncial/Comercial</option>
          <option value={'68'}>Rural</option>
          <option value={'69'}>Reflorestamento</option>
        </optgroup>
        <optgroup label="Ponto comercial">
          <option value={'70'}>Andar comercial</option>
          <option value={'71'}>Coméricio</option>
          <option value={'72'}>Indústria</option>
        </optgroup>
        <optgroup label="Sala comercial">
          <option value={'73'}>Andar comercial</option>
          <option value={'74'}>Duplex</option>
          <option value={'75'}>Em edifício</option>
          <option value={'76'}>Nível de rua</option>
          <option value={'77'}>Sobreposta</option>
          <option value={'78'}>Térreo</option>
        </optgroup>
        <optgroup label="Salão comercial">
          <option value={'79'}>Salão comercial</option>
        </optgroup>
      </Select>
    </FormControl>
  )
}