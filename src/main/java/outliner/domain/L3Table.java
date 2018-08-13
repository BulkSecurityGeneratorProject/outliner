package outliner.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A L3Table.
 */
@Entity
@Table(name = "l_3_table")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "l3table")
public class L3Table implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "classification")
    private String classification;

    @Column(name = "position")
    private String position;

    @Column(name = "flag")
    private String flag;

    @OneToMany(mappedBy = "table", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<L3Row> rows = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("tables")
    private L3 l3;

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

    public L3Table classification(String classification) {
        this.classification = classification;
        return this;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getPosition() {
        return position;
    }

    public L3Table position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getFlag() {
        return flag;
    }

    public L3Table flag(String flag) {
        this.flag = flag;
        return this;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public Set<L3Row> getRows() {
        return rows;
    }

    public L3Table rows(Set<L3Row> l3Rows) {
        this.rows = l3Rows;
        return this;
    }

    public L3Table addRows(L3Row l3Row) {
        this.rows.add(l3Row);
        l3Row.setTable(this);
        return this;
    }

    public L3Table removeRows(L3Row l3Row) {
        this.rows.remove(l3Row);
        l3Row.setTable(null);
        return this;
    }

    public void setRows(Set<L3Row> l3Rows) {
        this.rows = l3Rows;
    }

    public L3 getL3() {
        return l3;
    }

    public L3Table l3(L3 l3) {
        this.l3 = l3;
        return this;
    }

    public void setL3(L3 l3) {
        this.l3 = l3;
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
        L3Table l3Table = (L3Table) o;
        if (l3Table.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), l3Table.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "L3Table{" +
            "id=" + getId() +
            ", classification='" + getClassification() + "'" +
            ", position='" + getPosition() + "'" +
            ", flag='" + getFlag() + "'" +
            "}";
    }
}
