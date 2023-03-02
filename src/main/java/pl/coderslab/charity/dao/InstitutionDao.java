package pl.coderslab.charity.dao;

import org.springframework.stereotype.Repository;
import pl.coderslab.charity.entity.Institution;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class InstitutionDao {

    @PersistenceContext
    EntityManager em;

    public void save(Institution institution)
    {
        em.merge(institution);
    }

    public List<Institution> findAll()
    {
        return em.createQuery("select x from Institution x", Institution.class).getResultList();
    }
}
