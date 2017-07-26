/*
  skillsBlockFind {
    candidate.skills = await this.connection.queryAsync({
      sql: `SELECT s.name FROM skills_has_candidates s_c
            INNER JOIN skills s
            ON s.id=s_c.skill_id
            WHERE s_c.candidate_id = ?`,
      values: [id],
    }).map(skill => skill.name);
  }
*/

/*
  skillsBlockUpdate {
      await this.connection.queryAsync({
        sql: `DELETE FROM skills_has_candidates
              WHERE candidate_id = ?`,
        values: [id],
      });

      await Promise.all(skills.map(async (skill) => {
        const [{ id: skillId }] = await this.connection.queryAsync({
          sql: 'SELECT skills.id FROM skills WHERE name = ?',
          values: [skill],
        });

        await this.connection.queryAsync({
          sql: `INSERT INTO skills_has_candidates
                (skill_id, candidate_id) VALUES (?, ?)`,
          values: [skillId, id],
        });
      }));
  }
*/
