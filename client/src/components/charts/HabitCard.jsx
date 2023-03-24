import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import ChartsHeader from './ChartsHeader';

const HabitCard = ({ title, dataSource }) => {
  return (
    <div className='w-11/12 pl-2 pr-2 pt-2 pb-2'>
      <ChartsHeader title={title} />
      <GridComponent dataSource={dataSource}>
        <ColumnsDirective>
          <ColumnDirective headerText='Status' field='is_complete' width='20' textAlign="Center" />
          <ColumnDirective headerText='Goal' field='goal_name' width='80' />
          <ColumnDirective field='goal_number' width='0' />
          <ColumnDirective field='goal_id' width='0' />
        </ColumnsDirective>
      </GridComponent>
    </div>
  )
}

export default HabitCard;
