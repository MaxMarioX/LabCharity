package pl.coderslab.charity.dao;

import org.springframework.stereotype.Repository;
import pl.coderslab.charity.entity.Donation;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class DonationsDao {

    @PersistenceContext
    EntityManager em;

    public void save(Donation donation)
    {
        em.merge(donation);
    }

    public List<Donation> findAll()
    {
        return em.createQuery("select x from Donation x", Donation.class).getResultList();
    }

    public Long countQuantities()
    {
        return (Long) em.createQuery("select SUM(x.quantity) from Donation x").getSingleResult();
    }
}
