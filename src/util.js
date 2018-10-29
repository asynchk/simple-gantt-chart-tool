import moment from 'moment';

const transformInputData = (data, projectStartDate) => {
    const outputData = {};
    let activityStartDate = moment(projectStartDate);
    
  
    const dataEntryToActivityEntry = (activity) => {
      const { id, name, duration, dependencies } = activity;
      const ganttData = {
        id,
        text: name,
        duration: duration
      };
  
      // get StartDate
      ganttData['startDate'] = activityStartDate;
      if (dependencies && dependencies.length) {
      dependencies.forEach(dependency => {
        // console.log('checking current outputData', dependency, outputData)
        const dependencyDataKey = Object.keys(outputData).find((key) => outputData[key]['text'] == dependency)
        // console.log('checking dependencyData', outputData[dependencyDataKey])
        if (dependencyDataKey) {
          const dependencyData = outputData[dependencyDataKey];
          const { startDate, duration } = dependencyData;
          const dependencyEndDate = moment(startDate).add(duration, 'days')
          ganttData['startDate'] = moment.max(dependencyEndDate, activityStartDate)
        }
      })
      };
      // ganttData['startDate'] = ganttData['start_date']
      ganttData['start_date'] = ganttData['startDate'].format('DD-MM-YYYY')
      return ganttData;
    }
  
    return () => {
      data.forEach(activity => {
        
        const ganttData = dataEntryToActivityEntry(activity)
        // console.log('activity', activity, 'ganttData', ganttData)
        outputData[activity.id] = ganttData;
  })
    return Object.keys(outputData).map(key => outputData[key]);
    }
  }

  export default transformInputData;