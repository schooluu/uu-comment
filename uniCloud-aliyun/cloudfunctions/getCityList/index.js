'use strict';
exports.main = async (event, context) => {
  const db = uniCloud.database()
  
  try {
    const { province } = event
    let query = {
		
	}
    
    if (province) {
      query.parent_code = province
    }else{
		 query.type = 0
	}
    
    const cities = await db.collection('opendb-city-china').where(query).get()
    
    return {
      code: 0,
      data: cities.data,
      message: 'success'
    }
  } catch (error) {
    return {
      code: -1,
      data: null,
      message: error.message
    }
  }
} 