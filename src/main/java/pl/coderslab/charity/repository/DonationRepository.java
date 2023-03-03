package pl.coderslab.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.coderslab.charity.entity.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    @Query("select SUM(x.quantity) from Donation x")
    long sumQuantities();
}
