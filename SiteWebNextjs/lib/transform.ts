export const transformData = (fetchedData) => {
  const transformedData = fetchedData.map((academicYear) => {
    const specialities = academicYear.specialite.map((speciality) => {
      const sections = speciality.sections.map((section) => {
        return {
          name: section.name,
          schedule: section.schedule,
        };
      });

      return {
        name: speciality.name,
        sections: sections,
      };
    });

    return {
      year: academicYear.year,
      specialities: specialities,
    };
  });

  return transformedData;
};
