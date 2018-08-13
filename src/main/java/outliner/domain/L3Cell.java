package outliner.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A L3Cell.
 */
@Entity
@Table(name = "l_3_cell")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "l3cell")
public class L3Cell implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "classification")
    private String classification;

    @NotNull
    @Column(name = "position", nullable = false)
    private String position;

    @Column(name = "jhi_value")
    private String value;

    @ManyToOne
    @JsonIgnoreProperties("cells")
    private L3Row row;

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

    public L3Cell classification(String classification) {
        this.classification = classification;
        return this;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getPosition() {
        return position;
    }

    public L3Cell position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getValue() {
        return value;
    }

    public L3Cell value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public L3Row getRow() {
        return row;
    }

    public L3Cell row(L3Row l3Row) {
        this.row = l3Row;
        return this;
    }

    public void setRow(L3Row l3Row) {
        this.row = l3Row;
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
        L3Cell l3Cell = (L3Cell) o;
        if (l3Cell.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), l3Cell.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "L3Cell{" +
            "id=" + getId() +
            ", classification='" + getClassification() + "'" +
            ", position='" + getPosition() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
