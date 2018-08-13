package outliner.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A L1.
 */
@Entity
@Table(name = "l_1")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "l1")
public class L1 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "classification", nullable = false)
    private String classification;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "position", nullable = false)
    private String position;

    @OneToMany(mappedBy = "l1", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<L2> l2S = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassification() {
        return classification;
    }

    public L1 classification(String classification) {
        this.classification = classification;
        return this;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getTitle() {
        return title;
    }

    public L1 title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPosition() {
        return position;
    }

    public L1 position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Set<L2> getL2S() {
        return l2S;
    }

    public L1 l2S(Set<L2> l2S) {
        this.l2S = l2S;
        return this;
    }

    public L1 addL2(L2 l2) {
        this.l2S.add(l2);
        l2.setL1(this);
        return this;
    }

    public L1 removeL2(L2 l2) {
        this.l2S.remove(l2);
        l2.setL1(null);
        return this;
    }

    public void setL2S(Set<L2> l2S) {
        this.l2S = l2S;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        L1 l1 = (L1) o;
        if (l1.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), l1.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "L1{" +
            "id=" + getId() +
            ", classification='" + getClassification() + "'" +
            ", title='" + getTitle() + "'" +
            ", position='" + getPosition() + "'" +
            "}";
    }
}
