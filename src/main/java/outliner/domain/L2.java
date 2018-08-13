package outliner.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * A L2.
 */
@Entity
@Table(name = "l_2")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "l2")
public class L2 implements Serializable {

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

    
    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @OneToMany(mappedBy = "l2", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<L3> l3S = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("l2S")
    private L1 l1;

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

    public L2 classification(String classification) {
        this.classification = classification;
        return this;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getTitle() {
        return title;
    }

    public L2 title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPosition() {
        return position;
    }

    public L2 position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getContent() {
        return content;
    }

    public L2 content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Set<L3> getL3S() {
        return l3S;
    }

    public L2 l3S(Set<L3> l3S) {
        this.l3S = l3S;
        return this;
    }

    public L2 addL3(L3 l3) {
        this.l3S.add(l3);
        l3.setL2(this);
        return this;
    }

    public L2 removeL3(L3 l3) {
        this.l3S.remove(l3);
        l3.setL2(null);
        return this;
    }

    public void setL3S(Set<L3> l3S) {
        this.l3S = l3S;
    }

    public L1 getL1() {
        return l1;
    }

    public L2 l1(L1 l1) {
        this.l1 = l1;
        return this;
    }

    public void setL1(L1 l1) {
        this.l1 = l1;
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
        L2 l2 = (L2) o;
        if (l2.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), l2.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "L2{" +
            "id=" + getId() +
            ", classification='" + getClassification() + "'" +
            ", title='" + getTitle() + "'" +
            ", position='" + getPosition() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
