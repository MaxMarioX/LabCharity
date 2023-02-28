package pl.coderslab.charity.entity;

import javax.persistence.*;

@Entity
@Table(name="categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "donation_id")
    private Donation donation;

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDonation(Donation donation) {
        this.donation = donation;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Donation getDonation() {
        return donation;
    }
}
